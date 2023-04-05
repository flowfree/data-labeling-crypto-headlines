from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from djangorestframework_camel_case.render import (
    CamelCaseJSONRenderer,
    CamelCaseBrowsableAPIRenderer,
)
from transformers import pipeline
from .scraper import get_metadata_from_url


if settings.DEBUG:
    renderers = [CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer]
else:
    renderers = [CamelCaseJSONRenderer]


class_names = {
    'LABEL_0': 'negative',
    'LABEL_1': 'neutral',
    'LABEL_2': 'positive',
}
classifier = pipeline(model=settings.HF_MODEL_NAME)


class GetNewsSentiment(APIView):
    renderer_classes = renderers

    def get(self, request, *args, **kwargs):
        url = request.query_params.get('url')
        info = get_metadata_from_url(url)

        query = f"{info['title']} {info['description']}"
        query = query.replace('\n', ' ').strip()
        response = classifier(query)
        info['sentiment'] = class_names[response[0]['label']]

        return Response(info)
