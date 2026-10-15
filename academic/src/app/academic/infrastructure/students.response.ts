import {BaseResource, BaseResponse} from '../../../shared/infrastructure/base-response';

/**
 * Resource representation of a category.
 */
export interface StudentsResource extends BaseResource {
  /**
   * The unique identifier for the category.
   */
  id: number;

  /**
   * The name of the category.
   */
  fullName: string;

}

/**
 * Response envelope for category collection queries.
 */
export interface StudentsResponse extends BaseResponse {
  /**
   * The list of categories returned by the API.
   */
  students: StudentsResource[];
}
