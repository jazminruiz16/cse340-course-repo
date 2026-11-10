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

export { getAllProjects }  