package model

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
