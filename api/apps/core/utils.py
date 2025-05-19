import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.settings import BASE_DIR
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(BASE_DIR, '.env'))
username=os.getenv('EMAIL_HOST_USER')
password=os.getenv('EMAIL_HOST_PASSWORD')
email_host=os.getenv('EMAIL_HOST')
email_port=os.getenv('EMAIL_PORT')

def send_mail(html=None,text='Email_body',subject='Hello word',from_email='',to_emails=[]):
    assert isinstance(to_emails,list)
    msg=MIMEMultipart('alternative')
    msg['From']=from_email
    msg['To']=", ".join(to_emails)
    msg['Subject']=subject
    txt_part=MIMEText(text,'plain')
    msg.attach(txt_part)

    html_part = MIMEText(f"<p>Here is your password reset token</p><h1>{html}</h1>", 'html')
    msg.attach(html_part)
    msg_str=msg.as_string()


    server=smtplib.SMTP(host=email_host,port=email_port)
    server.ehlo()
    server.starttls()
    server.login(username,password)
    server.sendmail(from_email,to_emails,msg_str)
    server.quit()