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
        projects = Project.objects.all()
        
        projectname = request.GET.get('projectname', None)
        if projectname is not None:
            projects = Project.objects.all().filter(projectname__icontains = projectname)

    project_serializer = ProjectSerializer(projects, many = True)
    return  JsonResponse(project_serializer.data, safe = False)

@api_view(['GET'])
def count_project(request):
    if request.method =='GET':
        projects = Project.objects.all()

        count_project = projects.count()

    
    return JsonResponse({'message': 'The number of data is {}'.format(count_project)}, safe= False,)