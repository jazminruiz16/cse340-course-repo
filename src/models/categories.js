import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category.category_id, category.category_name 
      FROM public.category
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (categoryId) => {
  const query = `
        SELECT
          category_name,
          category_id
          
        FROM category
        WHERE category_id = $1;

      `;
  /**category.category_name,
  category.category_id,
    project.project_id,
    project.title,
    project.description,
    project.project_date,
    project.location
        FROM category
        INNER JOIN project_category
          ON category.category_id = project_category.category_id
          INNER JOIN project
            ON project_category.project_id = project.project_id
        WHERE category.category_id = $1;
  */
  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);

  // Return the first row of the result set, or null if no rows are found
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Creates a new category in the database.
 * @param {string} name - The name of the category.
 */
const createCategory = async (categoryName) => {
  const query = `
      INSERT INTO category (category_name)
      VALUES ($1)
      RETURNING category_id
    `;

  const queryParams = [categoryName];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new category with ID:', result.rows[0].category_id);
  }

  return result.rows[0].category_id;
};

export { getAllCategories, getCategoryDetails, createCategory }  