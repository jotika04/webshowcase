package model

import(
	jwt "github.com/form3tech-oss/jwt-go"
)

type Claim struct {
	ClaimID int `json:"claimID"`
	Issuer int `json:"issuer"`
	ExpiresAt int `json:"expiresAt"`
	Subject string `json:"subject"`
	IssuedAt int `json:"issuedAt"`
}

type Claims struct {
  	jwt.StandardClaims
}

type RefreshToken struct {
	RefreshToken string `json:"refresh_token"`
}

type AccessToken struct{
	AccessToken string `json:"access_token"`
}