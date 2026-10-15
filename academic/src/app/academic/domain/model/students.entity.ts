import {BaseEntity} from '../../../../shared/domain/model/base-entity';

/**
 * Represents a course category in the learning domain model.
 */
export class StudentsEntity implements BaseEntity {
  /**
   * The unique identifier for the category.
   */
  #id: number;

  /**
   * The name of the category.
   */
  #fullName: string;

  /**
   * Creates a new category entity.
   * @param props - Initialization values.
   */
  constructor(props: { id: number; fullName: string})  {
    this.#id = props.id;
    this.#fullName = props.fullName;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get fullName(): string {
    return this.#fullName;
  }

  set fullName(value: string) {
    this.#fullName = value;
  }
}
