package model


type User struct {
	UserID int `json:"userID"`
	Username string `json:"username"`
	UserFirstName string `json:"userFirstName"`
	UserLastName string `json:"userLastName"`
	Password string `json:"password"`
	BatchYear int `json:"batchYear"`
	Address string `json:"address"`
	BinusianID int `json:"binusianID"`
	Email string `json:"email"`
	PhoneNum string `json:"phoneNum"`
	RoleID int `json:"roleID"`

}

type RegisterUser struct{
	Username string `json:"username"`
	UserFirstName string `json:"userFirstName"`
	UserLastName string `json:"userLastName"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type LoginUser struct{
	UserID int `json:"userID"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type UpdateProfile struct{
	UserFirstName string `json:"userFirstName"`
	UserLastName string `json:"userLastName"`
	BatchYear int `json:"batchYear"`
	Address string `json:"address"`
	PhoneNum string `json:"phoneNum"`
}

type UpdateRole struct{
    UserID int `json:"userID" example:"1"`
   	Role string `json:"role" example:"guest"`
}

type HTTPError struct {
	Status  int `json:"status" example:"400"`
	Message string `json:"message" example:"status bad request"`
}

type Token struct{
	Access_token string `json:"access_token"`
	Refresh_token string `json:"refresh_token"`
}