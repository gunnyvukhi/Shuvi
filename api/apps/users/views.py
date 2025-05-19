from rest_framework import generics
from .models import Country, City, Address, Otp
from .serializers import CountrySerializer, CitySerializer, AddressSerializer, RegisterSerializer, ProfileSerializer, OtpSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import CountrySerializer, CitySerializer, AddressSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings

import random
#Register User
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        otp_code = request.data.get('otp_code')
        email = request.data.get('username')
        try:
            otp = Otp.objects.get(email=email, otp_code=otp_code)
            if timezone.now() > otp.expires_at:
                return Response({'error': 'OTP has expired'}, status=400)
        except Otp.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=400)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(response_data)

#api/profile  and api/profile/update
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# send otp
class CreateOtpView(generics.CreateAPIView):
    queryset = Otp.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = OtpSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        otp_code = str(random.randint(100000, 999999))
        serializer.save(otp_code=otp_code, expires_at=timezone.now() + timezone.timedelta(minutes=5))
        email = request.data.get('email')
        send_mail("Email verification", f"Here is your otp {otp_code}", settings.EMAIL_HOST_USER, [email])

        return Response({'message': 'OTP sent successfully'}, status=201)

# api/otp/check
class CheckOtpView(generics.GenericAPIView):
    queryset = Otp.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = OtpSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')
        try:
            otp = Otp.objects.get(email=email, otp_code=otp_code)
            if timezone.now() > otp.expires_at:
                return Response({'error': 'OTP has expired'}, status=400)
            try:
                user = User.objects.get(username=email)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=200)
            except User.DoesNotExist:
                return Response({'otp': otp.otp_code}, status=200)
        except Otp.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=400)
        
# change password
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    new_password = request.data.get('new_password')

    user.set_password(new_password)
    user.save()
    refresh = RefreshToken.for_user(user)
    return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=200)