from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.hashers import check_password
from rest_framework.decorators import permission_classes

from rest_framework.permissions import AllowAny,IsAuthenticated

import json

from apps.account.models import User



@permission_classes([AllowAny])
class LoginView(APIView):

    def post(self, request):
        data = json.loads(request.body)

        matriculation = data.get('matriculation')
        password = data.get('password')
        
        if matriculation and password:
            try:
                user = User.objects.get(matriculation=matriculation)
            except User.DoesNotExist:
                return Response({'error': 'Invalid matriculation'}, status=400)
            
            
            if check_password(password, user.password):
                refresh_token = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh_token.access_token),
                    # 'refresh': str(refresh_token)
                })
            else:
                return Response({'error': 'Invalid password'}, status=400)
            
        else:
            return Response({'error': 'Matriculation and password are required'}, status=400)      