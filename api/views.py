from rest_framework.viewsets import ModelViewSet

from api.models import Todo
from api.serializers import TodoSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
