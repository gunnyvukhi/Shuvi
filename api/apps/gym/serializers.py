from rest_framework import serializers
from .models import Measurement

class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = {
            'id',
            'user',
            'weight',
            'height',
            'date',
        }
    def validate_weight(self, value):
        if value <= 0:
            raise serializers.ValidationError("Cân nặng phải lớn hơn 0")
        return value
    
    def validate_height(self, value):
        if value <= 0:
            raise serializers.ValidationError("Chiều cao phải lớn hơn 0")
        return value