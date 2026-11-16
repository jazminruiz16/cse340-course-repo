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

  const queryParams = [organizationId];
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


export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };  