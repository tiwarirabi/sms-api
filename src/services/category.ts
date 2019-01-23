import { Food } from '../domains/food';
import * as foodModel from '../models/food';
import { Category } from '../domains/category';
import * as categoryModel from '../models/category';
import DataNotFoundError from '../errors/DataNotFoundError';

/**
 * Fetch All categories.
 */
export async function fetchAll(): Promise<Category[]> {
  try {
    const categories = await categoryModel.fetch();

    const foodPromises = categories.map((category: Category) =>
      foodModel.fetchByCategoryId(category.id)
    );
    const foods = await Promise.all(foodPromises);

    return categories.map((category: Category) => ({
      ...category,
      foods:
        foods.length > 0 && foods[0].length > 0
          ? foods.filter(([food]: Food[]) => food.categoryId === category.id)[0]
          : []
    }));
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetch by Id.
 */
export async function fetchById(categoryId: number): Promise<Category> {
  try {
    const categoryPromise: Promise<Category[]> = categoryModel.fetch(
      categoryId
    );
    const foodPromise: Promise<Food[]> = foodModel.fetchByCategoryId(
      categoryId
    );

    const [[category], foods] = await Promise.all([
      categoryPromise,
      foodPromise
    ]);
    if (!category) {
      throw new DataNotFoundError('category with this id not found.');
    }
    category.foods = [...foods];

    return category;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Save a new category.
 *
 * @param {category} category
 */
export async function save(category: any) {
  try {
    const [id] = await categoryModel.save(category);

    return { id, ...category };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Update a category.
 *
 * @param {number} categoryId
 * @param {Category} categoryBody
 */
export async function update(categoryId: number, categoryBody: Category) {
  try {
    await categoryModel.update(categoryId, categoryBody);

    return { id: categoryId, ...categoryBody };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Delete a category.
 *
 * @param {number} categoryId
 */
export async function remove(categoryId: number) {
  try {
    await categoryModel.remove(categoryId);

    return { id: categoryId };
  } catch (error) {
    throw new Error(error);
  }
}
