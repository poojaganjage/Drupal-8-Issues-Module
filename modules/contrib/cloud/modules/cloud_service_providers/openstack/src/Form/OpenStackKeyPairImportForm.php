<?php

namespace Drupal\openstack\Form;

use Drupal\aws_cloud\Form\Ec2\KeyPairImportForm;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class KeyPairImportForm.
 *
 * Responsible for key importing via user uploaded public key.
 *
 * @package Drupal\openstack\Form
 */
class OpenStackKeyPairImportForm extends KeyPairImportForm {

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('openstack.ec2'),
      $container->get('entity.repository'),
      $container->get('entity_type.bundle.info'),
      $container->get('datetime.time'),
      $container->get('messenger'),
      $container->get('entity.link_renderer'),
      $container->get('entity_type.manager'),
      $container->get('cache.render'),
      $container->get('plugin.cache_clearer'),
      $container->get('plugin.manager.cloud_config_plugin'),
      $container->get('current_user'),
      $container->get('current_route_match'),
      $container->get('date.formatter'),
      $container->get('renderer')
    );
  }

}
