<?php

namespace Drupal\k8s\Entity;

use Drupal\cloud\Entity\CloudViewBuilder;

/**
 * Provides the cluster role binding view builders.
 */
class K8sClusterRoleBindingViewBuilder extends CloudViewBuilder {

  /**
   * {@inheritdoc}
   */
  protected function getFieldsetDefs() {
    return [
      [
        'name' => 'cluster_role_binding',
        'title' => $this->t('Cluster Role Binding'),
        'open' => TRUE,
        'fields' => [
          'name',
          'created',
          'labels',
          'annotations',
          'subjects',
          'role_ref',
        ],
      ],
      [
        'name' => 'cluster_role_binding_detail',
        'title' => $this->t('Detail'),
        'open' => FALSE,
        'fields' => [
          'detail',
        ],
      ],
      [
        'name' => 'others',
        'title' => $this->t('Others'),
        'open' => FALSE,
        'fields' => [
          'cloud_context',
          'uid',
        ],
      ],
    ];
  }

}
