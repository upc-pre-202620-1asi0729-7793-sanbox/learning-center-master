import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {StudentsEntity} from '../domain/model/students.entity';
import {StudentsResponse, StudentsResource} from './students.response';

/**
 * Maps category entities to and from API resources.
 */
export class StudentsAssembler implements BaseAssembler<StudentsEntity, StudentsResource, StudentsResponse> {

  /**
   * Converts a CategoriesResponse to an array of Category entities.
   * @param response - The API response containing categories.
   * @returns An array of Category entities.
   */
  toEntitiesFromResponse = (response: StudentsResponse): StudentsEntity[] =>
    response.students.map(resource => this.toEntityFromResource(resource as StudentsResource));

  /**
   * Converts a CategoryResource to a Category entity.
   * @param resource - The resource to convert.
   * @returns The converted Category entity.
   */
  toEntityFromResource = (resource: StudentsResource): StudentsEntity =>
    new StudentsEntity({
      id: resource.id,
      fullName: resource.fullName
    });

  /**
   * Converts a Category entity to a CategoryResource.
   * @param entity - The entity to convert.
   * @returns The converted CategoryResource.
   */
  toResourceFromEntity = (entity: StudentsEntity): StudentsResource =>
    ({
      id: entity.id,
      fullName: entity.fullName
    } as StudentsResource);


}
