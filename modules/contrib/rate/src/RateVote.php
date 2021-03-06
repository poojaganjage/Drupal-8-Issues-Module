<?php

namespace Drupal\rate;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\votingapi\VoteResultFunctionManager;

/**
 * Returns responses for Rate routes.
 */
class RateVote {
  use StringTranslationTrait;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Votingapi result manager.
   *
   * @var \Drupal\votingapi\VoteResultFunctionManager
   */
  protected $resultManager;

  /**
   * Database connection object.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * Database connection object.
   *
   * @var \Drupal\rate\RateBotDetector
   */
  protected $botDetector;

  /**
   * Account proxy (the current user).
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $accountProxy;

  /**
   * Messenger service.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * Constructor for vote service.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\votingapi\VoteResultFunctionManager $result_manager
   *   The vote result manager.
   * @param \Drupal\Core\Database\Connection $database
   *   The entity type manager.
   * @param \Drupal\rate\RateBotDetector $bot_detector
   *   The bot detector service.
   * @param \Drupal\Core\Session\AccountProxyInterface $account_proxy
   *   The current user.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager,
                              VoteResultFunctionManager $result_manager,
                              Connection $database,
                              RateBotDetector $bot_detector,
                              AccountProxyInterface $account_proxy,
                              MessengerInterface $messenger) {
    $this->entityTypeManager = $entity_type_manager;
    $this->resultManager = $result_manager;
    $this->database = $database;
    $this->botDetector = $bot_detector;
    $this->accountProxy = $account_proxy;
    $this->messenger = $messenger;
  }

  /**
   * Record a vote.
   *
   * @param string $entity_type_id
   *   Entity type ID such as node.
   * @param int $entity_id
   *   Entity id of the entity type.
   * @param string $vote_type_id
   *   Vote type id.
   * @param int $value
   *   The vote value.
   * @param bool $show_messages
   *   If TRUE, standard Drupal message will be set.
   */
  public function vote($entity_type_id, $entity_id, $vote_type_id, $value, $show_messages = TRUE) {
    if (!$this->validateVoteValue($vote_type_id, $value)) {
      return;
    }

    $entity = $this->entityTypeManager->getStorage($entity_type_id)->load($entity_id);
    $is_bot_vote = $this->botDetector->checkIsBot();

    if (!$is_bot_vote && $this->accountProxy->hasPermission('cast rate vote on ' . $entity_type_id . ' of ' . $entity->bundle())) {
      /** @var \Drupal\votingapi\VoteStorageInterface $vote_storage */
      $vote_storage = $this->entityTypeManager->getStorage('vote');
      $vote_ids = $vote_storage->getUserVotes(
        $this->accountProxy->id(),
        $vote_type_id,
        $entity_type_id,
        $entity_id
      );

      // If user hasn't voted, save the vote.
      if (empty($vote_ids)) {
        /** @var \Drupal\votingapi\VoteTypeInterface $vote_type */
        $vote_type = $this->entityTypeManager->getStorage('vote_type')->load($vote_type_id);
        /** @var \Drupal\votingapi\VoteInterface $vote */
        $vote = $vote_storage->create(['type' => $vote_type_id]);
        $vote->setVotedEntityId($entity_id);
        $vote->setVotedEntityType($entity_type_id);
        $vote->setValueType($vote_type->getValueType());
        $vote->setValue($value);
        $vote->save();
        $this->resultManager->recalculateResults($entity_type_id, $entity_id, $vote_type_id);

        if ($show_messages) {
          $this->messenger->addStatus($this->t('Your :type vote was added.', [
            ':type' => $vote_type_id,
          ]));
        }
      }
      // Otherwise, inform user of previous vote.
      elseif ($show_messages) {
        $this->messenger->addWarning($this->t('You are not allowed to vote the same way multiple times.'));
      }
    }
  }

  /**
   * Undo a vote.
   *
   * @param string $entity_type_id
   *   Entity type ID such as node.
   * @param int $entity_id
   *   Entity id of the entity type.
   * @param bool $show_messages
   *   If TRUE, standard Drupal message will be set.
   */
  public function undoVote($entity_type_id, $entity_id, $show_messages = TRUE) {
    $entity = $this->entityTypeManager->getStorage($entity_type_id)->load($entity_id);
    $is_bot_vote = $this->botDetector->checkIsBot();

    if (!$is_bot_vote && $this->accountProxy->hasPermission('cast rate vote on ' . $entity_type_id . ' of ' . $entity->bundle())) {
      $vote_storage = $this->entityTypeManager->getStorage('vote');
      $vote_result = $vote_storage->getUserVotes(
        $this->accountProxy->id(),
        NULL,
        $entity_type_id,
        $entity_id
      );

      // If a vote has been found, remove it.
      if (!empty($vote_result)) {
        $vote_ids = array_keys($vote_result);
        $vote_id = array_pop($vote_ids);
        $vote = $vote_storage->load($vote_id);
        if ($vote) {
          $vote->delete();
        }

        if ($show_messages) {
          $this->messenger->addStatus($this->t('Your vote was canceled.'));
        }
      }
      elseif ($show_messages) {
        // Otherwise, inform user of previous vote.
        $this->messenger->addWarning($this->t('A previous vote was not found.'));
      }
    }
  }

  /**
   * Validates whether a value is allowed for a given vote type.
   *
   * @param $vote_type_id
   *   Vote type id.
   * @param $value
   *   The vote value.
   *
   * @return bool
   *   Returns TRUE if the value is allowed, FALSE otherwise.
   */
  public function validateVoteValue($vote_type_id, $value) {
    $allowed_values = [-1, 1];
    if ($vote_type_id == 'fivestar') {
      $allowed_values = [1, 2, 3, 4, 5];
    }
    return in_array($value, $allowed_values);
  }

}
