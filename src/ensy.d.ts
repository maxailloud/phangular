// Type definitions for ensy - Entity System JavaScript Library
// Version: v1.3.0

declare module 'ensy'  {
    export interface ProcessorInterface {
        /**
         * @param {number} dt The time delta since the last call.
         */
        update(dt: number): void;
    }

    export interface Component<T> {
        state: T;
    }

    export interface Assemblage {
        components: string[];
        initialState: { [componentId: string]: any };
    }

    export class EntityManager {
        /**
         * @param {Function} listener
         */
        constructor(listener?: Function);

        /**
         * Return an identifier unique to this system.
         *
         * @returns {number}
         */
        getUid(): number;

        /**
         * Create a new entity in the system by creating a new instance of each of its components.
         *
         * @param {string[]} componentIds List of identifiers of the components that compose the new entity
         * @param {number} entityId Optional. Unique identifier of the entity. If passed, no new id will be generated.
         * @returns {number} Unique identifier of the new entity.
         */
        createEntity(componentIds: string[], entityId?: number): number;

        /**
         * Remove an entity and its instanciated components from the system.
         *
         * @param {number} id Unique identifier of the entity.
         * @returns {EntityManager} this
         */
        removeEntity(id: number): EntityManager;

        /**
         * Add a component to the list of known components.
         *
         * @param {string} id Unique identifier of the component.
         * @param {object} component object containing the metadata and data of the component.
         * @returns {EntityManager} this
         */
        addComponent(id: string, component: any): EntityManager;

        /**
         * Remove a component from the list of known components.
         *
         * @param {string} id - Unique identifier of the component.
         * @return {EntityManager} this
         */
        removeComponent(id: string): EntityManager;

        /**
         * Get the list of components this instance knows.
         *
         * @return {any[]} List of names of components.
         */
        getComponentsList(): any[];

        /**
         * Create a new instance of each listed component and associate them with the entity.
         *
         * @param {string[]} componentIds List of identifiers of the components to add to the entity.
         * @param {number} entityId Unique identifier of the entity.
         * @return {EntityManager} this
         */
        addComponentsToEntity(componentIds: string[], entityId: number): EntityManager;

        /**
         * De-associate a list of components from the entity.
         *
         * @param {string[]} componentIds List of identifiers of the components to remove from the entity.
         * @param {number} entityId Unique identifier of the entity.
         * @return {EntityManager} this
         */
        removeComponentsFromEntity(componentIds: string[], entityId: number): EntityManager;

        /**
         * Return a reference to an object that contains the data of an instanciated component of an entity.
         *
         * @param {string} componentId Unique identifier of the component.
         * @param {number} entityId Unique identifier of the entity.
         * @return {any} Component data of one entity.
         */
        getComponentDataForEntity(componentId: string, entityId: number): any;

        /**
         * Update the state of a component, many keys at once.
         *
         * @param {string} componentId Unique identifier of the component.
         * @param {number} entityId Unique identifier of the entity.
         * @param {any} newState object containing the new state to apply.
         * @return {EntityManager} EntityManager
         */
        updateComponentDataForEntity(componentId: string, entityId: number, newState: any): EntityManager;

        /**
         * Return a list of objects containing the data of all of a given component.
         *
         * @param {string} componentId Unique identifier of the component.
         * @return {object[]} List of component data for one component.
         */
        getComponentsData(componentId: string): any[];

        /**
         * Return true if the entity has the component.
         *
         * @param {number} entityId Unique identifier of the entity.
         * @param {string} componentId Unique identifier of the component.
         * @return {boolean} True if the entity has the component.
         */
        entityHasComponent(entityId: number, componentId: string): boolean;

        /**
         * Add an assemblage to the list of known assemblages.
         *
         * @param {string} id Unique identifier of the assemblage.
         * @param {Assemblage} assemblage An instance of an assemblage to add.
         * @return {EntityManager} this
         */
        addAssemblage(id: string, assemblage: Assemblage): EntityManager;

        /**
         * Remove an assemblage from the list of known assemblages.
         *
         * @param {string} id Unique identifier of the assemblage.
         * @return {EntityManager} this
         */
        removeAssemblage(id: string): EntityManager;

        /**
         * Create a new entity in the system by creating a new instance of each of
         * its components and setting their initial state, using an assemblage.
         *
         * @param {string} assemblageId Id of the assemblage to create the entity from.
         * @return {number} Unique identifier of the new entity.
         */
        createEntityFromAssemblage(assemblageId: string): number;

        // =========================================================================
        // PROCESSORS

        /**
         * Add a processor to the list of known processors.
         *
         * @param {object} processor An instance of a processor to manage.
         * @return {EntityManager} this
         */
        addProcessor(processor: ProcessorInterface): EntityManager;

        /**
         * Remove a processor from the list of known processors.
         *
         * @param {ProcessorInterface} processor An instance of a processor to remove.
         * @return {EntityManager} this
         */
        removeProcessor(processor: ProcessorInterface): EntityManager;

        /**
         * Update all the known processors.
         *
         * @param {number} dt The time delta since the last call to update.
         *                      Will be passed as an argument to all processor's `update` method.
         * @return {EntityManager} this
         */
        update(dt: number): EntityManager;
    }

    export default EntityManager;
}
