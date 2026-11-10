-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

--DELETE FROM organization
--WHERE organization_id = 15;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
	organization_id INTEGER NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organization (organization_id)
);

INSERT INTO project (title, description, location, project_date,organization_id)
VALUES
('Community Garden','A community project focused on creating and maintaining shared vegetable gardens. Volunteers help plant vegetables, maintain garden spaces, and teach residents about composting and sustainable agriculture.','Green Valley Community Center','2027-03-15', 2),
('Reading Program','An educational initiative that supports children in developing reading and writing skills through storytelling, reading assistance, and literacy workshops.','Oakwood Public Library','2027-03-20',3),
('Neighborhood Cleanup','A volunteer initiative dedicated to improving public spaces through street cleaning, waste collection, recycling activities, and environmental education.','Riverside Neighborhood Park','2027-04-05',3),
('Health Workshop','A community health education project that provides workshops about nutrition, healthy habits, disease prevention, and general wellness.','Westside Community Hall','2027-04-12',3),
('Food Donation Drive','A charitable project that collects non-perishable food donations, prepares food baskets, and distributes them to families experiencing economic difficulties.','Central Community Center','2027-04-18',3),
('Tree Planting Campaign','An environmental conservation project that encourages volunteers to plant trees, care for seedlings, and learn about biodiversity and reforestation.','Green Valley Public Park','2027-05-10',1),
('Youth Tutoring','An educational volunteer program offering academic support to young students in mathematics, English, and homework assignments.','Oakwood Learning Center','2027-05-15',3),
('Community Fitness Day','A community wellness event that promotes physical activity through group exercises, walking activities, and educational workshops about healthy lifestyles.','Riverside Sports Center','2027-05-22',3);

INSERT INTO project (title, description, location, project_date, organization_id)
VALUES
('Sustainable Housing Renovation','A community infrastructure project focused on renovating homes using sustainable construction materials and energy-efficient solutions. Volunteers help improve living conditions for low-income families.','Oakwood Residential Area','2027-06-05',1),
('Community Playground Construction','A construction initiative dedicated to building safe and accessible playgrounds for children. The project promotes community participation and the use of environmentally friendly materials.','Riverside Community Park','2027-06-15',1),
('Green Building Workshop','An educational construction project that teaches residents about sustainable building techniques, energy efficiency, water conservation, and environmentally responsible materials.','BrightFuture Training Center','2027-06-25',1),
('Public Park Infrastructure Improvement','A community development project focused on improving public park infrastructure through the renovation of benches, walking paths, accessibility features, and recreational spaces.','Green Valley Public Park','2027-07-05',1),
('Urban Farming Education','An educational initiative that teaches families how to grow vegetables in small urban spaces using sustainable agricultural practices and organic gardening techniques.','Green Valley Community Center','2027-06-10',2),
('Organic Food Production Program','A community agriculture project that promotes organic vegetable production, soil conservation, composting, and responsible water management among local growers.','GreenHarvest Urban Farm','2027-06-20',2),
('School Vegetable Garden','A collaborative project that helps students establish and maintain school vegetable gardens while learning about nutrition, biodiversity, and sustainable food production.','Oakwood Elementary School','2027-07-01',2),
('Community Composting Initiative','An environmental education project that encourages residents to separate organic waste and produce compost for urban gardens and community farming activities.','Central Community Garden','2027-07-12',2);

SELECT * FROM project;

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);


INSERT INTO category (category_name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

SELECT * FROM category;

--DROP TABLE project_category; -- borrar tabla

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),   
    FOREIGN KEY (project_id) REFERENCES project (project_id),
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

INSERT INTO project_category (project_id,category_id)
VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1),
(3, 3),
(4, 4),
(5, 3),
(6, 1),
(6, 3),
(7, 2),
(8, 4);

INSERT INTO project_category (project_id,category_id)
VALUES
(8, 3),

(9, 1),
(9, 3),

(10, 3),

(11, 1),
(11, 2),

(12, 3),
(12, 1),

(13, 1),
(13, 2),

(14, 1),

(15, 1),
(15, 2),

(16, 1),
(16, 3);

SELECT * FROM project_category;