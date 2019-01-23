import * as foodModel from '../models/food';
import { Food } from '../domains/food';
import DataNotFoundError from '../errors/DataNotFoundError';

/**
 * Fetch All categories.
 */
export async function fetchAll(): Promise<Food[]> {
  try {
    return await foodModel.fetch();
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetch by Id.
 */
export async function fetchById(foodId: number): Promise<Food> {
  try {
    const [food] = await foodModel.fetch(foodId);
    if (!food) {
      throw new DataNotFoundError('Food with this id not found.');
    }

    return food;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetch by Id.
 */
export async function fetchByCategoryId(categoryId: number): Promise<Food[]> {
  try {
    const foods = await foodModel.fetchByCategoryId(categoryId);
    if (!foods || foods.length <= 0) {
      throw new DataNotFoundError('Food with this id not found.');
    }

    return foods;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Save a new food.
 *
 * @param {food} food
 */
export async function save(food: any) {
  try {
    const [id] = await foodModel.save(food);

    return { id, ...food };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Update a food.
 *
 * @param {number} foodId
 * @param {Food} foodBody
 */
export async function update(foodId: number, foodBody: Food) {
  try {
    await foodModel.update(foodId, foodBody);

    return { id: foodId, ...foodBody };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Delete a Food.
 *
 * @param {number} foodId
 */
export async function remove(foodId: number) {
  try {
    await foodModel.remove(foodId);

    return { id: foodId };
  } catch (error) {
    throw new Error(error);
  }
}
