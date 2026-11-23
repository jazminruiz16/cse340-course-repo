import db from './db.js'

const getAllProjects = async () => {
  const query = `
        SELECT project.project_id, project.title, project.description, project.location, project.project_date, organization.name
      FROM public.project
      INNER JOIN public.organization
        ON public.project.organization_id=public.organization.organization_id;
    `;

  const result = await db.query(query);

  return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM project
        WHERE organization_id = $1 
        ORDER BY project_date;
      `;
  // $1 placeholder for the 1st parameter wich will be pass to the query at the time of execution 
  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
        SELECT
          category.category_name,
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
        WHERE category.category_id = $1
        ORDER BY project_date;
      `;

  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);

  return result.rows;
};
const getUpcomingProjects = async (numberProjects) => {
  const query = `
        SELECT
          project.project_id,
          project.title,
          project.description,
          project.project_date AS date,
          project.location,
          project.organization_id,
          organization.name AS organization_name
        FROM project
        INNER JOIN organization
          ON project.organization_id = organization.organization_id
        WHERE project.project_date >= CURRENT_DATE
        ORDER BY project.project_date ASC
        LIMIT $1;
      `;

  const queryParams = [numberProjects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (project_id) => {
  const query = `
        SELECT
          project.project_id,
          project.title,
          project.description,
          project.project_date AS date,
          project.location,
          organization.organization_id,
          organization.name AS organization_name
        FROM project
        INNER JOIN organization
          ON project.organization_id = organization.organization_id
        WHERE project.project_id = $1;

      `;

  const queryParams = [project_id];
  const result = await db.query(query, queryParams);

  // Return the first row of the result set, or null if no rows are found
  return result.rows.length > 0 ? result.rows[0] : null;
};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
      INSERT INTO project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}
export { getAllProjects, getProjectsByOrganizationId, getProjectsByCategoryId, getUpcomingProjects, getProjectDetails, createProject};  