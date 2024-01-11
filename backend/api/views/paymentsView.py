from decimal import Decimal

from rest_framework import request, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from stripe import Webhook, error
from django.http import JsonResponse
from api.models import Payments

import stripe

stripe.api_key = "sk_test_51OTO2ZSE2AFTsjwiqQM53l4AP77OVr8gWNxzzORy21Jav1Fnb5T5sJD8B4AVieJVuabZvlaoWfEUy4egouV2HBtJ00zTLQ8R4L"


class PaymentsViewSet(ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    customerEmail = "raju.developer42@gmail.com"

    @action(detail=False, methods=['POST'])
    def create_payment_link(self, request):
        amount = request.POST.get('amount')
        if amount or amount.isdigit():
            try:
                payment_intent = stripe.PaymentIntent.create(
                    amount=round(Decimal(amount)) * 100,
                    currency='inr',
                    payment_method_types=['card']
                )
                user_id = 1
                user_payment_id = Payments.objects.create(user_id=user_id, transaction_id=payment_intent.id,
                                                          amount=amount)
                return Response({'flag': 1, 'msg': "", 'data': payment_intent}, status=status.HTTP_200_OK)
            except stripe.error.StripeError as e:
                # Handle specific Stripe errors if needed
                return Response({'flag': 2, 'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                # Handle other unexpected exceptions
                return Response({'flag': 2, 'msg': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'flag': 2, 'msg': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def update_user_payment_status(self, request):
        user_id = 1
        transaction_id = request.POST.get('transaction_id')
        payment_instance = Payments.objects.get(user_id=user_id, transaction_id=transaction_id)
        if payment_instance is not None:
            payment_instance.payment_status = 1
            payment_instance.save()
            return Response({'flag': 1, 'msg': "Success", "data": payment_instance.id}, status=status.HTTP_200_OK)
        else:
            return Response({'flag': 0, 'msg': "Failed"}, status=status.HTTP_200_OK)

    def handle_webhook(self, request):
        payload = request.body
        sig_header = request.headers['Stripe-Signature']
        endpoint_secret = 'your_stripe_endpoint_secret'

        try:
            event = Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            # Invalid payload
            return JsonResponse({'error': 'Invalid payload'}, status=400)
        except error.SignatureVerificationError as e:
            # Invalid signature
            return JsonResponse({'error': 'Invalid signature'}, status=400)

        # Handle the event
        if event['type'] == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            # Process the successful payment as needed
            print("Payment succeeded:", payment_intent)

        return JsonResponse({'status': 'success'}, status=200)
