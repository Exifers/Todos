from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.models import Todo
from api.serializers import TodoSerializer


class TodoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
