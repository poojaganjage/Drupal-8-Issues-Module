<?php

namespace Drupal\Tests\k8s\Functional;

/**
 * Tests K8s deployment.
 *
 * @group K8s
 */
class K8sDeploymentTest extends K8sTestBase {

  public const K8S_DEPLOYMENT_REPEAT_COUNT = 2;

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \Exception
   */
  protected function getPermissions(): array {
    $namespaces = $this->createNamespacesRandomTestFormData();
    $this->createNamespaceTestEntity($namespaces[0]);
    $this->namespace = $namespaces[0]['name'];

    return [
      'list k8s deployment',
      'add k8s deployment',
      'view any k8s deployment',
      'edit any k8s deployment',
      'delete any k8s deployment',
      'view k8s namespace ' . $this->namespace,
    ];
  }

  /**
   * Tests CRUD for Deployment.
   *
   * @throws \Behat\Mink\Exception\ResponseTextException
   * @throws \Behat\Mink\Exception\ExpectationException
   */
  public function testDeployment(): void {

    $cloud_context = $this->cloudContext;

    // List Deployment for K8s.
    $this->drupalGet("/clouds/k8s/$cloud_context/deployment");
    $this->assertNoErrorMessage();

    // Add a new Deployment.
    $add = $this->createDeploymentTestFormData(self::K8S_DEPLOYMENT_REPEAT_COUNT, $this->namespace);
    for ($i = 0; $i < self::K8S_DEPLOYMENT_REPEAT_COUNT; $i++) {
      $this->reloadMockData();

      $this->addDeploymentMockData($add[$i]);

      $this->drupalPostForm(
        "/clouds/k8s/$cloud_context/deployment/add",
        $add[$i]['post_data'],
        $this->t('Save')
      );
      $this->assertNoErrorMessage();
      $t_args = ['@type' => 'Deployment', '%label' => $add[$i]['name']];
      $this->assertSession()->pageTextContains(strip_tags($this->t('The @type %label has been created.', $t_args)));

      // Make sure listing.
      $this->drupalGet("/clouds/k8s/$cloud_context/deployment");
      $this->assertNoErrorMessage();
      $this->assertSession()->pageTextContains($add[$i]['name']);
    }

    for ($i = 0, $num = 1; $i < self::K8S_DEPLOYMENT_REPEAT_COUNT; $i++, $num++) {
      // Make sure the all deployment listing exists.
      $this->drupalGet('/clouds/k8s/deployment');
      $this->assertNoErrorMessage();

      for ($j = 0; $j < $num; $j++) {
        $this->assertSession()->pageTextContains($add[$j]['name']);
      }
    }

    // Edit a Deployment.
    $edit = $this->createDeploymentTestFormData(self::K8S_DEPLOYMENT_REPEAT_COUNT, $this->namespace);
    for ($i = 0, $num = 1; $i < self::K8S_DEPLOYMENT_REPEAT_COUNT; $i++, $num++) {

      $this->updateDeploymentMockData($edit[$i]);

      unset($edit[$i]['post_data']['namespace']);
      $this->drupalPostForm(
        "/clouds/k8s/$cloud_context/deployment/$num/edit",
        $edit[$i]['post_data'],
        $this->t('Save')
      );
      $this->assertNoErrorMessage();
      $t_args = ['@type' => 'Deployment', '%label' => $add[$i]['name']];
      $this->assertSession()->pageTextContains(strip_tags($this->t('The @type %label has been updated.', $t_args)));
    }

    // Delete Deployment.
    for ($i = 0, $num = 1; $i < self::K8S_DEPLOYMENT_REPEAT_COUNT; $i++, $num++) {

      $this->deleteDeploymentMockData($add[$i]);

      $this->drupalPostForm(
        "/clouds/k8s/$cloud_context/deployment/$num/delete",
        [],
        $this->t('Delete')
      );
      $this->assertNoErrorMessage();
      $t_args = ['@type' => 'Deployment', '@label' => $add[$i]['name']];
      $this->assertSession()->pageTextContains(strip_tags($this->t('The @type @label has been deleted.', $t_args)));

      // Make sure listing.
      $this->drupalGet("/clouds/k8s/$cloud_context/deployment");
      $this->assertNoErrorMessage();
      $this->assertSession()->pageTextNotContains($add[$i]['name']);
    }
  }

  /**
   * Tests deleting deployments with bulk operation.
   *
   * @throws \Exception
   */
  public function testDeploymentBulk(): void {

    for ($i = 0; $i < self::K8S_DEPLOYMENT_REPEAT_COUNT; $i++) {
      // Create Deployments.
      $deployments = $this->createDeploymentsRandomTestFormData($this->namespace);
      $entities = [];
      foreach ($deployments ?: [] as $deployment) {
        $entities[] = $this->createDeploymentTestEntity($deployment);
      }
      $this->deleteDeploymentMockData($deployments[0]);
      $this->runTestEntityBulk('deployment', $entities);
    }
  }

}
