from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.core.paginator import Paginator

from webapp.models import Project
from webapp.serializers import ProjectSerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def webapp_allproject(request):
    if request.method == 'GET':
        
        projectname = request.GET.get('projectname', None)
        if projectname is not None:
            projects = Project.objects.all().filter(projectname__icontains = projectname)

    project_serializer = ProjectSerializer(projects, many = True)
    return  JsonResponse(project_serializer.data, safe = False)

@api_view(['GET'])
def project_pages(request):

    if request.method =='GET':
        count_project = Project.objects.all().count()

        project_per_page = count_project / 8 
        
        project_num = 8

        project_page = request.GET.get('page', None)
        if project_page is not None:
            project_page = int(project_page)
            

            max_project = project_num * project_page

            pagenum = project_num * (project_page - 1) # need to be 
            # calculate the page number logic before adding the offset 
            # and limit to the dataperpage var
            dataperpage = Project.objects.all()[pagenum : max_project]
        page_serializer = ProjectSerializer(dataperpage, many = True)

    # return JsonResponse({'message': 'The number of data is {}'.format(count_project)}, safe= False,)
    return JsonResponse(page_serializer.data, safe= False,)

@api_view(['GET'])
def sort_project(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        
        course = request.GET.get('course', None)
        if course is not None:
            projectcourse = Project.objects.all().filter(course__icontains = course)

    project_serializer = ProjectSerializer(projectcourse, many = True)
    return  JsonResponse(project_serializer.data, safe = False)
