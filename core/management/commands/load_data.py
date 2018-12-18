from django.core.management.base import BaseCommand
from core.models import User, Post, Follow, Response
from mimesis import Person
from faker import Faker
import random


class Command(BaseCommand):
    """ Add "add arguments" to this? """
    # def add arguments(self, parser)
        # pass

    def handle(self, *args, **kwargs):
        print('Deleting Database...')
        User.objects.filter(is_superuser=False).delete()
        Post.objects.all().delete()
        Follow.objects.all().delete()
        Response.objects.all().delete()

        person = Person()
        fake = Faker()

        users = []
        for fake_user in range(100):
            # double check "create_user" vs "create"
            fake_user = User.objects.create_user(person.username(), person.email(), 'password')
            users.append(fake_user)
        print("100 Fake Users Created")

        fake_posts = []
        for i in range(50):
            post_dictionary = {
                'text': fake.sentence(),
                'user': users[random.randrange(100)],
            }
            fake_posts.append(post_dictionary)

        posts = []
        for post_data in fake_posts:
            post = Post.objects.create(**post_data)
            posts.append(post)
        print('50 Posts Imported')

        for i in range(200):
            Response.objects.create(post=posts[random.randrange(50)], user=users[random.randrange(100)], text=fake.sentence())
        print('200 Responses Imported')

        for i in range(100):
            Follow.objects.create(following_user=users[i], followed_user=users[random.randrange(30)])
        print('100 Follows Imported')

        print('All Data Imported Successfully')

