package project

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
	util "backend_rest/util"
	"time"
	"strconv"
	model "backend_rest/model"
)

// GetProject godoc
// @Summary Get project details
// @Description Get project info by projectID
// @Tags Project
// @Accept  json
// @Produce  json
// @Param projectID path int true "Project ID"
// @Success 200 {object} model.Project
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/project/:projectID [get]
func GetProject(c *fiber.Ctx)error{
	projectID := c.Params("projectID")
	db := database.DBConn
	var project *model.Project = &model.Project{}

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

// SubmitProject godoc
// @Summary Submit project 
// @Description Submit project into database
// @Tags Project 
// @Accept  json
// @Produce  json
// @Param project body model.SubmitProject true "Submit Project"
// @Success 200 {object} model.HTTPError
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/project/submit [post]
func SubmitProject(c *fiber.Ctx)error{
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
    
	var project *model.Project = &model.Project{}
	var submitProject *model.SubmitProject = &model.SubmitProject{}

	if err := c.BodyParser(submitProject); err != nil {
        return err
    }

    issuer := claims.Issuer

    userID, err := strconv.Atoi(issuer)

    var requestroleID int
    err = db.QueryRow("SELECT roleID FROM user WHERE userID=?", userID).Scan(&requestroleID)
    if err != nil {
			fmt.Println(err.Error())
			// return err, nil
	}
    if requestroleID == 4{
    	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized for project submission",
        }) 
    }

	err = db.QueryRow(`
		Select userID From user Where userID=?
		`, userID).
		Scan(
			&project.UserID,
		)

	projectVerified := false


	if err == nil{
		db.Exec("INSERT into project (userID, course, projectName, description, verified, projectImage, projectVideo, projectThumbnail) values (?,?,?,?,?,?,?,?)", project.UserID, submitProject.Course, submitProject.ProjectName, submitProject.Description, projectVerified, submitProject.ProjectImage, submitProject.ProjectVideo, submitProject.ProjectThumbnail)
		
		submit_notif := submitProject.ProjectName + " Successfully Submitted"

		// var newproject Project
		var newproject *model.Project = &model.Project{}
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

		db.Exec("INSERT into notification (userID, notif_text) values (?,?)", userID, submit_notif)

		return c.JSON(model.HTTPError{
			Status: 201,
			Message: "Project Submission Success",
		})
	} else{
		return c.JSON(model.HTTPError{
			Status: 201,
			Message: "User does not exist",
		})
	}
	
}

// GetUnverifiedProjects godoc
// @Summary Display list of unverified projects
// @Description query projects from database where verified = false
// @Tags Project
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Project
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/unverified-project [get]
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

	// var projects []Project
	var projects []*model.Project
	projectVerified := false

    rows, err := db.Query(`
        SELECT *
        FROM project WHERE verified=?
        `, projectVerified)

	if err != nil {
		fmt.Println(err.Error())
		// return err, nil
	}

	// var project Project
	var project *model.Project = &model.Project{}
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

// VerifyProject godoc
// @Summary Verify project 
// @Description Update project verified status into true
// @Tags Project
// @Accept  json
// @Produce  json
// @Param project body model.VerifyProject true "Verify Project"
// @Success 200 {object} model.HTTPError
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/project/verify [patch]
func VerifyProject(c *fiber.Ctx)error{
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

    // var project *model.Project = &model.Project{}
    var project *model.VerifyProject = &model.VerifyProject{}


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

	var newproject *model.Project = &model.Project{}
	err = db.QueryRow(`
		Select userID, projectName From project Where projectID=?
		`, project.ProjectID).
		Scan(
			&newproject.UserID,
			&newproject.ProjectName,
		)
		if err != nil{
			fmt.Println(err.Error())
		}

	submit_notif := newproject.ProjectName + " Verified" 
	db.Exec("INSERT into notification (userID, notif_text) values (?,?)", newproject.UserID, submit_notif)

	return c.JSON(model.HTTPError{
		Status: 200,
		Message: "Project Verified",
	})
}

// RejectProject godoc
// @Summary Reject project submission
// @Description Decline project submission
// @Tags Project
// @Accept  json
// @Produce  json
// @Param project body model.RejectProject true "Reject Project"
// @Success 200 {object} model.HTTPError
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/project/reject [delete]
func RejectProject(c *fiber.Ctx)error{
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

    // var project *model.Project = &model.Project{}
    var project *model.RejectProject = &model.RejectProject{}


	if err := c.BodyParser(project); err != nil {
            return err
    }

    var newproject *model.Project = &model.Project{}
	err = db.QueryRow(`
		Select userID, projectName From project Where projectID=?
		`, project.ProjectID).
		Scan(
			&newproject.UserID,
			&newproject.ProjectName,
		)
		if err != nil{
			fmt.Println(err.Error())
		}

	reject_notif := newproject.ProjectName + " Rejected, Reason: " + project.Message 
	
	db.Exec("DELETE FROM project WHERE projectID=?", project.ProjectID)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}

	db.Exec("INSERT into notification (userID, notif_text) values (?,?)", newproject.UserID, reject_notif)
    

	return c.JSON(model.HTTPError{
		Status: 200,
		Message: "Project Rejected",
	})
}
