# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Claim(models.Model):
    claimid = models.AutoField(db_column='claimID', primary_key=True)  # Field name made lowercase.
    issuer = models.CharField(max_length=255, blank=True, null=True)
    expiresat = models.IntegerField(db_column='expiresAt', blank=True, null=True)  # Field name made lowercase.
    subject = models.CharField(max_length=255, blank=True, null=True)
    issuedat = models.IntegerField(db_column='issuedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'claim'


class Course(models.Model):
    courseid = models.AutoField(db_column='courseID', primary_key=True)  # Field name made lowercase.
    coursename = models.CharField(db_column='courseName', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'course'


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Notification(models.Model):
    notificationid = models.AutoField(db_column='notificationID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userID')  # Field name made lowercase.
    notif_text = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notification'


class Project(models.Model):
    projectid = models.AutoField(db_column='projectID', primary_key=True)  # Field name made lowercase.
    projectname = models.CharField(db_column='projectName', max_length=255)  # Field name made lowercase.
    description = models.CharField(max_length=255, blank=True, null=True)
    verified = models.IntegerField(blank=True, null=True)
    course = models.CharField(max_length=255)
    projectimage = models.CharField(db_column='projectImage', max_length=255, blank=True, null=True)  # Field name made lowercase.
    projectvideo = models.CharField(db_column='projectVideo', max_length=255, blank=True, null=True)  # Field name made lowercase.
    projectthumbnail = models.CharField(db_column='projectThumbnail', max_length=255, blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'project'


class Role(models.Model):
    roleid = models.AutoField(db_column='roleID', primary_key=True)  # Field name made lowercase.
    role = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'role'


class User(models.Model):
    userid = models.AutoField(db_column='userID', primary_key=True)  # Field name made lowercase.
    userfirstname = models.CharField(db_column='userFirstName', max_length=255)  # Field name made lowercase.
    userlastname = models.CharField(db_column='userLastName', max_length=255)  # Field name made lowercase.
    password = models.CharField(max_length=255)
    batchyear = models.IntegerField(db_column='batchYear', blank=True, null=True)  # Field name made lowercase.
    address = models.CharField(max_length=255, blank=True, null=True)
    binusianid = models.IntegerField(db_column='binusianID', blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    phonenum = models.CharField(db_column='phoneNum', max_length=255, blank=True, null=True)  # Field name made lowercase.
    roleid = models.ForeignKey(Role, models.DO_NOTHING, db_column='roleID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user'


class WebappWebshowcaseproject(models.Model):
    id = models.BigAutoField(primary_key=True)
    projectid = models.IntegerField()
    projectname = models.CharField(db_column='projectName', max_length=1000)  # Field name made lowercase.
    description = models.CharField(max_length=1000)
    verified = models.IntegerField()
    course = models.CharField(max_length=100)
    userid = models.IntegerField(db_column='userId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'webapp_webshowcaseproject'
