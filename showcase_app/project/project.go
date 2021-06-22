package project

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
	util "backend_rest/util"
	"time"
	"strconv"
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
	fmt.Println("submit project ok")
	db := database.DBConn

	now := time.Now().Unix()
	claims, err := util.ExtractTokenMetadata(c)
	if err != nil {
        // Return status 500 and JWT parse error.
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": true,
            "msg":   err.Error(),
        })
    }
    expires := claims.Expires

    // Checking, if now time greather than expiration from JWT.
    if now > expires {
        // Return status 401 and unauthorized error message.
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, check expiration time of your token",
        })
    }
    

	project := new(Project)

	if err := c.BodyParser(project); err != nil {
        return err
    }

    

    // userID := project.UserID

    issuer := claims.Issuer

    userID, err := strconv.Atoi(issuer)

	err = db.QueryRow(`
		Select userID From user Where userID=?
		`, userID).
		Scan(
			&project.UserID,
		)

	projectStatus := false

	if err == nil{
		db.Exec("INSERT into project (userID, course, projectName, description, verified, projectImage, projectVideo, projectThumbnail) values (?,?,?,?,?,?,?,?)", project.UserID, project.Course, project.ProjectName, project.Description, projectStatus, project.ProjectImage, project.ProjectVideo, project.ProjectThumbnail)
		
		submit_notif := project.ProjectName + " Successfully Submitted"

		var newproject Project
		err := db.QueryRow(`
		Select projectID From project Where projectName=? AND userID=?
		`, project.ProjectName, project.UserID).
		Scan(
			&newproject.ProjectID,
		)
		if err != nil{
			fmt.Println(err.Error())
		}
		// fmt.Println("Project ID is ...", newproject.ProjectID)

		db.Exec("INSERT into notification (userID, projectID, notif_text) values (?,?,?)", userID, newproject.ProjectID, submit_notif)

		return c.JSON(RequestResponse{
			Status: 201,
			Message: "Project Submission Success",
		})
	} else{
		return c.JSON(RequestResponse{
			Status: 201,
			Message: "User does not exist",
		})
	}
	
}

func GetUnverifiedProjects(c *fiber.Ctx)error{
	now := time.Now().Unix()
	claims, err := util.ExtractTokenMetadata(c)
	if err != nil {
        // Return status 500 and JWT parse error.
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": true,
            "msg":   err.Error(),
        })
    }
    expires := claims.Expires

    // Checking, if now time greather than expiration from JWT.
    if now > expires {
        // Return status 401 and unauthorized error message.
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, check expiration time of your token",
        })
    }

	db := database.DBConn
	var projects []Project
	projectStatus := false

    rows, err := db.Query(`
        SELECT *
        FROM project WHERE verified=?
        `, projectStatus)

	if err != nil {
		fmt.Println(err.Error())
		// return err, nil
	}

	var project Project
    for rows.Next() {
        err := rows.Scan(&project.ProjectID,
            	&project.ProjectName,
            	&project.Description,
            	&project.Verified,
            	&project.Course, 
            	&project.ProjectImage,
            	&project.ProjectVideo,
            	&project.ProjectThumbnail,
            	&project.UserID)
        if err != nil {
            fmt.Println(err)
        }
        projects = append(projects, project)
    }

	return c.JSON(projects)
}

func ValidateProject(c *fiber.Ctx)error{
	now := time.Now().Unix()
	claims, err := util.ExtractTokenMetadata(c)
	if err != nil {
        // Return status 500 and JWT parse error.
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": true,
            "msg":   err.Error(),
        })
    }
    expires := claims.Expires

    // Checking, if now time greather than expiration from JWT.
    if now > expires {
        // Return status 401 and unauthorized error message.
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, check expiration time of your token",
        })
    }

    issuer := claims.Issuer
    requestID, err := strconv.Atoi(issuer)

    var requestroleID int
    db := database.DBConn

    err = db.QueryRow("SELECT roleID FROM user WHERE userID=?", requestID).Scan(&requestroleID)
    if err != nil {
			fmt.Println(err.Error())
			// return err, nil
	}
    if requestroleID > 2{
    	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, for validators and admins only",
        }) 
    }

    project := new(Project)


	if err := c.BodyParser(project); err != nil {
            return err
    }

    projectStatus := true
    
    db.Exec(`
		UPDATE project SET verified=? WHERE projectID=?
		`, projectStatus, project.ProjectID)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	return c.JSON(RequestResponse{
		Status: 200,
		Message: "Project Verified",
	})
}
