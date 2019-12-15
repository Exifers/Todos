from django.db import models


class Todo(models.Model):
    text = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True, null=True)
    due_date = models.DateTimeField(auto_now_add=False, null=True)
    count = models.IntegerField(null=True)
    status = models.CharField(
        choices=(
            ('OPEN', 'open'),
            ('DOING', 'doing'),
            ('REVIEW', 'review'),
            ('CLOSED', 'closed'),
        ),
        max_length=50,
        null=True
    )
    done = models.BooleanField(default=False)
