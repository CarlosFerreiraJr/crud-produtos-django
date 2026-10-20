from django.db import models

class Produto(models.Model):
    id_produto = models.AutoField(primary_key=True)
    nome_produto = models.CharField(max_length=150)
    id_qrcode = models.CharField(max_length=100, unique=True)
    descricao_tecnica = models.TextField(blank=True, null=True)
    status_produto = models.CharField(max_length=7)
    nome_imagem = models.CharField(max_length=255, blank=True, null=True)
    tipo_produto = models.CharField(
        max_length=8,
        choices=[
            ('VENDA', 'Venda'),
            ('CONSULTA', 'Consulta')
        ]
    )
    local_instalacao = models.CharField(max_length=150, blank=True, null=True)
    tipo_gas = models.CharField(max_length=80, blank=True, null=True)
    situacao_produto = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'produtos'

    def __str__(self):
        return self.nome_produto