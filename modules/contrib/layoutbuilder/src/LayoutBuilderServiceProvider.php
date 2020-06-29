<?php

namespace Drupal\layoutbuilder;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderInterface;
use Drupal\layoutbuilder\EventSubscriber\SetInlineBlockDependency;
use Drupal\layoutbuilder\Normalizer\LayoutEntityDisplayNormalizer;
use Symfony\Component\DependencyInjection\ChildDefinition;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Sets the layoutbuilder.get_block_dependency_subscriber service definition.
 *
 * This service is dependent on the block_content module so it must be provided
 * dynamically.
 *
 * @internal
 *   Service providers are internal.
 *
 * @see \Drupal\layoutbuilder\EventSubscriber\SetInlineBlockDependency
 */
class LayoutBuilderServiceProvider implements ServiceProviderInterface {

  /**
   * {@inheritdoc}
   */
  public function register(ContainerBuilder $container) {
    $modules = $container->getParameter('container.modules');
    if (isset($modules['block_content'])) {
      $definition = new Definition(SetInlineBlockDependency::class);
      $definition->setArguments([
        new Reference('entity_type.manager'),
        new Reference('database'),
        new Reference('inline_block.usage'),
        new Reference('plugin.manager.layoutbuilder.section_storage'),
      ]);
      $definition->addTag('event_subscriber');
      $container->setDefinition('layoutbuilder.get_block_dependency_subscriber', $definition);
    }
    if (isset($modules['serialization'])) {
      $definition = (new ChildDefinition('serializer.normalizer.config_entity'))
        ->setClass(LayoutEntityDisplayNormalizer::class)
        // Ensure that this normalizer takes precedence for Layout Builder data
        // over the generic serializer.normalizer.config_entity.
        ->addTag('normalizer', ['priority' => 5]);
      $container->setDefinition('layoutbuilder.normalizer.layout_entity_display', $definition);
    }
  }

}
