
namespace com.clockupstudio.util {

    /**
     * EntityUtil is utility to operate with ut.Entity.
     */
    export class EntityUtil {
        /**
         * setActive make entity appear/disappear in a game world.
         * @param world a game world
         * @param entity a entity
         * @param visible
         */
        static setActive(world: ut.World, entity: ut.Entity, visible: boolean): void {
            if (visible) {
                EntityUtil.removeComponent(world, entity, ut.Disabled);
            } else {
                EntityUtil.addComponent(world, entity, ut.Disabled);
            }
        }

        /**
         * addComponent add a component into entity safely.
         * @param world a game world
         * @param entity a entity
         * @param component a component needs to add into entity
         */
        static addComponent<T>(world: ut.World, entity: ut.Entity, component: ut.ComponentClass<T>) {
            if (!world.hasComponent(entity, component)) {
                world.addComponent(entity, component);
            }
        }

        /**
         * removeComponent remove a component into entity safely.
         * @param world a game world
         * @param entity a entity
         * @param component a component needs to add into entity
         */
        static removeComponent<T>(world: ut.World, entity: ut.Entity, component: ut.ComponentClass<T>) {
            if (world.hasComponent(entity, component)) {
                world.removeComponent(entity, component);
            }
        }
    }

}
