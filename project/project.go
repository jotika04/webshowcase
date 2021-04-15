package project

import(
	"github.com/gofiber/fiber/v2"
	"boilerplate_go_rest/database"
)

type Project struct {
	ProjectID int `json:"projectID"`
	UserID int `json:"userID"`
	CourseID int `json:"courseID"`
	ProjectName string `json:"projectName"`
	Description string `json:"description"`
	Verified boolean `json:"verified"`
	ProjectImagePath string `json:"projectImagePath"`

}

func GetProject(c *fiber.Ctx)error{
	projectID := c.Params("projectID")
	db := database.DBConn
	var project Project
	// var err error
	// db.Find(&user, userID)

	// userInfo := User{}
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