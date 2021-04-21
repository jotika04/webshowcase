package project

import(
	"github.com/gofiber/fiber/v2"
	"boilerplate_go_rest/database"
	"fmt"
)

type Project struct {
	ProjectID int `json:"projectID"`
	UserID int `json:"userID"`
	CourseID int `json:"courseID"`
	ProjectName string `json:"projectName"`
	Description string `json:"description"`
	Verified bool `json:"verified"`
	ProjectImagePath string `json:"projectImagePath"`

}

type HTTPError struct {
	Status  string
	Message string
}

func GetProject(c *fiber.Ctx)error{
	projectID := c.Params("projectID")
	db := database.DBConn
	var project Project

    err := db.QueryRow(`
        SELECT projectID, 
        projectName, 
        description, 
        verified 
        FROM project WHERE projectID=?
        `, projectID).
        Scan(
            &project.ProjectID,
            &project.ProjectName,
            &project.Description, 
            &project.Verified,
            
        )
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	return c.JSON(project)

}

func SubmitProject(c *fiber.Ctx)error{
	db := database.DBConn

	project := new(Project)


	if err := c.BodyParser(project); err != nil {
            return err
    }
    projectStatus := false

	db.Exec("INSERT into project (projectName, description, verified) values (?,?,?)", project.ProjectName, project.Description, projectStatus)

	return c.JSON("Project Submission Success")
}