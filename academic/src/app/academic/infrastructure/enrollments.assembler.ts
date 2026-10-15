import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {EnrollmentsEntity} from '../domain/model/enrollments.entity';
import {EnrollmentsResource, EnrollmentsResponse} from './enrollments.response';


/**
 * Maps category entities to and from API resources.
 */
export class EnrollmentsAssembler implements BaseAssembler<EnrollmentsEntity, EnrollmentsResource, EnrollmentsResponse> {

  /**
   * Converts a CategoriesResponse to an array of Category entities.
   * @param response - The API response containing categories.
   * @returns An array of Category entities.
   */
  toEntitiesFromResponse = (response: EnrollmentsResponse): EnrollmentsEntity[] =>
    response.Enrollments.map(resource => this.toEntityFromResource(resource as EnrollmentsResource));

  /**
   * Converts a CategoryResource to a Category entity.
   * @param resource - The resource to convert.
   * @returns The converted Category entity.
   */
  toEntityFromResource = (resource: EnrollmentsResource): EnrollmentsEntity =>
    new EnrollmentsEntity({
      id: resource.id,
      studentId: resource.studentId,
      courseName: resource.courseName,
      student: null
    });

  /**
   * Converts a Category entity to a CategoryResource.
   * @param entity - The entity to convert.
   * @returns The converted CategoryResource.
   */
  toResourceFromEntity = (entity: EnrollmentsEntity): EnrollmentsResource =>
    ({
      id: entity.id,
      studentId: entity.studentId,
      courseName: entity.courseName
    } as EnrollmentsResource);
}
