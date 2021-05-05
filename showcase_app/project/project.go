package project

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
)

type Project struct {
	ProjectID int `json:"projectID"`
	UserID int `json:"userID"`
	Course string `json:"course"`
	ProjectName string `json:"projectName"`
	Description string `json:"description"`
	Verified bool `json:"verified"`
	ProjectImage string `json:"projectImage"`
	ProjectVideo string `json:"projectVideo"`
	ProjectThumbnail string `json:"projectThumbnail"`

}

type HTTPError struct {
	Status  string
	Message string
}

type RequestResponse struct {
	Status  int
	Message string
}

func GetProject(c *fiber.Ctx)error{
	projectID := c.Params("projectID")
	db := database.DBConn
	var project Project

    err := db.QueryRow(`
        SELECT projectID,
        userID,
        course, 
        projectName, 
        description, 
        verified,
        projectImage,
        projectVideo,
        projectThumbnail 
        FROM project WHERE projectID=?
        `, projectID).
        Scan(
            &project.ProjectID,
            &project.UserID,
            &project.Course,
            &project.ProjectName,
            &project.Description, 
            &project.Verified,
            &project.ProjectImage,
            &project.ProjectVideo,
            &project.ProjectThumbnail,
            
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

    // convert image and video to base64
    
    projectStatus := false

	db.Exec("INSERT into project (course, projectName, description, verified, projectImage, projectVideo, projectThumbnail) values (?,?,?,?,?,?,?)", project.Course, project.ProjectName, project.Description, projectStatus, project.ProjectImage, project.ProjectVideo, project.ProjectThumbnail)

	return c.JSON(RequestResponse{
		Status: 201,
		Message: "Project Submission Success",
	})
}