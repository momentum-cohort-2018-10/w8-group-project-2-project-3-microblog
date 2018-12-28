from django.test import TestCase
from core.models import Post, User, Response, Follow

# Create your tests here.
class CoreTest(TestCase):
    def test_index(self):
        a = self.client.get('/')
        self.assertEqual(a.status_code, 200)

    def test_no_logic_page(self):
        b = self.client.get('/about/')
        self.assertEqual(a.status_code, 200)

class PostTest(TestCase):
    c = User.objects.create_user('username_a', 'email_a@gmail.com', 'password')
    def create_post(self, text='cowabunga', user=c):
        
        post_data = {
            'text': text,
            'user': user
        }

        d = Post.objects.create(**post_data)

    def test_post_creation(self):
        e = self.create_post()
        self.assertTrue(isinstance(e, Post))
        self.assertEqual(e.__str__(), e.text)