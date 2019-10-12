from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.models import Todo
from api.serializers import TodoSerializer


class TodoViewSet(ModelViewSet):
    def dispatch(self, request, *args, **kwargs):
        print(request.POST)
        return super(TodoViewSet, self).dispatch(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super(TodoViewSet, self).create(request, *args, **kwargs)

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
