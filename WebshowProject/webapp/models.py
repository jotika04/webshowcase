from django.db import models

class Project(models.Model):
    projectid = models.AutoField(db_column='projectID', primary_key=True)  # Field name made lowercase.
    projectname = models.CharField(db_column='projectName', max_length=255)  # Field name made lowercase.
    description = models.CharField(max_length=255, blank=True, null=True)
    verified = models.IntegerField(blank=True, null=True)
    course = models.CharField(max_length=255)
    projectimage = models.CharField(db_column='projectImage', max_length=255, blank=True, null=True)  # Field name made lowercase.
    projectvideo = models.CharField(db_column='projectVideo', max_length=255, blank=True, null=True)  # Field name made lowercase.
    projectthumbnail = models.CharField(db_column='projectThumbnail', max_length=255, blank=True, null=True)  # Field name made lowercase.
    # userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'project'

# class User(models.Model):
#     userid = models.AutoField(db_column='userID', primary_key=True)  # Field name made lowercase.
#     userfirstname = models.CharField(db_column='userFirstName', max_length=255)  # Field name made lowercase.
#     userlastname = models.CharField(db_column='userLastName', max_length=255)  # Field name made lowercase.
#     password = models.CharField(max_length=255)
#     batchyear = models.IntegerField(db_column='batchYear', blank=True, null=True)  # Field name made lowercase.
#     address = models.CharField(max_length=255, blank=True, null=True)
#     binusianid = models.IntegerField(db_column='binusianID', blank=True, null=True)  # Field name made lowercase.
#     email = models.CharField(max_length=255)
#     username = models.CharField(max_length=255)
#     phonenum = models.CharField(db_column='phoneNum', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     roleid = models.ForeignKey(Role, models.DO_NOTHING, db_column='roleID', blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False

# class Role(models.Model):
#     roleid = models.AutoField(db_column='roleID', primary_key=True)  # Field name made lowercase.
#     role = models.CharField(max_length=255)

#     class Meta:
#         managed = False
#         db_table = 'role'

