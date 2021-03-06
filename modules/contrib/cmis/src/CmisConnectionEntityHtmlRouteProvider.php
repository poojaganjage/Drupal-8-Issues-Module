<?php

/**
 * Provides cmis module Implementation.
 *
 * @category Module
 *
 * @package Contrib
 *
 * @author Display Name <username@example.com>
 *
 * @license https://www.drupal.org/ Drupal
 *
 * @version "GIT: <1001>"
 *
 * @link https://www.drupal.org/
 */

declare(strict_types = 1);

namespace Drupal\cmis;

use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\Routing\AdminHtmlRouteProvider;
use Symfony\Component\Routing\Route;

/**
 * Provides routes for CMIS connection entities.
 *
 * TODO: to test, this whole file can be removed. All routes are in the Entity
 * annotation. And no apparent override is present.
 *
 * @category Module
 *
 * @package Drupal\cmis
 *
 * @author Display Name <username@example.com>
 *
 * @license https://www.drupal.org/ Drupal
 *
 * @version "Release: 8"
 *
 * @link https://www.drupal.org/
 *
 * @see Drupal\Core\Entity\Routing\AdminHtmlRouteProvider
 * @see Drupal\Core\Entity\Routing\DefaultHtmlRouteProvider
 */
class CmisConnectionEntityHtmlRouteProvider extends AdminHtmlRouteProvider
{

    /**
     * Gets the route.
     *
     * @param \Drupal\Core\Entity\EntityTypeInterface $entity_type The entity type.
     *
     * @return \Symfony\Component\Routing\Route|null
     *   The generated route, if available.
     */
    public function getRoutes(EntityTypeInterface $entity_type)
    {
        $collection = parent::getRoutes($entity_type);

        $entity_type_id = $entity_type->id();

        if ($collection_route = $this->getCollectionRoute($entity_type)) {
            $collection->add(
                "entity.{$entity_type_id}.collection", 
                $collection_route
            );
        }

        if ($add_form_route = $this->getAddFormRoute($entity_type)) {
            $collection->add("entity.{$entity_type_id}.add_form", $add_form_route);
        }

        return $collection;
    }

    /**
     * Gets the collection route.
     *
     * @param \Drupal\Core\Entity\EntityTypeInterface $entity_type The entity type.
     *
     * @return \Symfony\Component\Routing\Route|null
     *   The generated route, if available.
     */
    protected function getCollectionRoute(EntityTypeInterface $entity_type)
    {
        if ($entity_type->hasLinkTemplate('collection') 
            && $entity_type->hasListBuilderClass()
        ) {
            $entity_type_id = $entity_type->id();
            $route = new Route($entity_type->getLinkTemplate('collection'));
            $route
                ->setDefaults(
                    [
                    '_entity_list' => $entity_type_id,
                    // Make sure this is not a TranslatableMarkup object as the
                    // TitleResolver translates this string again.
                    '_title' => (string) $entity_type->getLabel(),
                    ]
                )
                ->setRequirement('_permission', $entity_type->getAdminPermission())
                ->setOption('_admin_route', true);

            return $route;
        }
    }

    /**
     * Gets the add-form route.
     *
     * @param \Drupal\Core\Entity\EntityTypeInterface $entity_type The entity type.
     *
     * @return \Symfony\Component\Routing\Route|null
     *   The generated route, if available.
     */
    protected function getAddFormRoute(EntityTypeInterface $entity_type)
    {
        if ($entity_type->hasLinkTemplate('add-form')) {
            $entity_type_id = $entity_type->id();
            $route = new Route($entity_type->getLinkTemplate('add-form'));
            // Use the add form handler, if available, otherwise default.
            $operation = 'default';
            if ($entity_type->getFormClass('add')) {
                $operation = 'add';
            }
            $route
                ->setDefaults(
                    [
                    '_entity_form' => "{$entity_type_id}.{$operation}",
                    '_title' => "Add {$entity_type->getLabel()}",
                    ]
                )
                ->setRequirement('_entity_create_access', $entity_type_id)
                ->setOption(
                    'parameters', [
                    $entity_type_id => ['type' => 'entity:' . $entity_type_id],
                    ]
                )
                ->setOption('_admin_route', true);

            return $route;
        }
    }

}
