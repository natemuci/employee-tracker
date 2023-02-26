SELECT
        employee.id AS "Employee",
        employee.first_name AS "First Name",
        employee.last_name AS "Last Name",
        roles.title AS "Job Title",
        department.department_name AS "Department Name",
        roles.salary AS "Salary",
        employee.manager_id AS "Manager"
        FROM employee
        LEFT JOIN roles
            ON roles.id = employee.role_id
        LEFT JOIN department
            ON department.id = roles.department_id
