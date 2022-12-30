INSERT INTO department (department_name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', '100000', '4'),
        ('Salesperson', '80000', '4'),
        ('Lead Engineer', '150000', '1'),
        ('Software Engineer', '120000', '1'),
        ('Account Manager', '160000', '2'),
        ('Accountant', '125000', '2'),
        ('Legal Team Lead', '250000', '3'),
        ('Lawyer', '190000', '3');
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Mello', '1', null),
        ('Jane', 'Gil', '2', '1'),
        ('Dan', 'Raan', '3', null),
        ('Sergio', 'Martinez', '4', '3'),
        ('Jeff', 'Mello', '5', null),
        ('Clyde', 'Fello', '6', '6'),
        ('Angie', 'Hyde', '7', null),
        ('Clay', 'Turner', '8', null);