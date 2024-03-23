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
                return Response({'error': 'Credenciais inválidas. Verifique sua matricula e senha.'}, status=401)
            
            
            if check_password(password, user.password):
                user_dto = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'matriculation': user.matriculation,
                    'course': user.course,
                    'photo': user.photo,
                    'sex': user.sex,
                }
                refresh_token = RefreshToken.for_user(user)
                return Response({
                    'user': user_dto,
                    'access_token': str(refresh_token.access_token),
                    'refresh_token': str(refresh_token)
                })
            else:
                return Response({'error': 'Credenciais inválidas. Verifique sua matricula e senha.'}, status=401)
            
        else:
            return Response({'error': 'Matricula e senha são obrigatórios'}, status=400)      