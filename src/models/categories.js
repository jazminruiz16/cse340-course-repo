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

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE category
    SET category_name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const queryParams = [name, categoryId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated category with ID:', categoryId);
  }

  return result.rows[0].category_id;
};

//_____________________________________________________________________
const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}
export { getAllCategories, getCategoryDetails, createCategory, updateCategory, assignCategoryToProject, updateCategoryAssignments}  