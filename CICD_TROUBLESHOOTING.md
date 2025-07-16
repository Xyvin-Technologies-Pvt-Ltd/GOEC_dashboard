# CI/CD Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. **Missing GitHub Secrets** 🔑

**Problem**: Workflow fails with "secret not found" errors

**Solution**: Add these secrets in your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `LIGHTSAIL_HOST`: Your AWS Lightsail instance IP (e.g., `3.250.123.45`)
   - `LIGHTSAIL_USER`: SSH username (usually `ubuntu` or `ec2-user`)
   - `LIGHTSAIL_KEY`: Your private SSH key content (not file path)

### 2. **SSH Key Issues** 🔐

**Problem**: SSH connection fails

**Solution**:

1. **Generate SSH key pair**:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
   ```
2. **Add public key to Lightsail**:
   - Copy `~/.ssh/id_rsa.pub` content
   - Add to Lightsail instance: `~/.ssh/authorized_keys`
3. **Add private key to GitHub**:
   - Copy `~/.ssh/id_rsa` content (the private key)
   - Add as `LIGHTSAIL_KEY` secret

### 3. **Permission Issues** 📁

**Problem**: "Permission denied" errors

**Solution**:

1. **Check sudo access**:
   ```bash
   # On your Lightsail instance
   sudo whoami
   ```
2. **Ensure user can restart nginx**:
   ```bash
   # Add user to sudoers (if needed)
   sudo usermod -aG sudo $USER
   ```

### 4. **Nginx Configuration** 🌐

**Problem**: Nginx not serving the app

**Solution**: Create/update nginx config:

```bash
# On Lightsail instance
sudo nano /etc/nginx/sites-available/goec-dashboard
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # or your IP

    root /var/www/html/goec-dashboard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Handle React Router
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/goec-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. **Firewall/Security Groups** 🔒

**Problem**: Connection timeout

**Solution**:

1. **Check Lightsail firewall**:
   - Allow SSH (port 22)
   - Allow HTTP (port 80)
   - Allow HTTPS (port 443)
2. **Check security groups** (if using EC2):
   - Inbound rules should allow SSH from anywhere (0.0.0.0/0)

### 6. **Build Failures** 🏗️

**Problem**: Build step fails

**Solution**:

1. **Check Node.js version**: Ensure it matches your local version
2. **Clear npm cache**: `npm cache clean --force`
3. **Check dependencies**: Ensure all packages are compatible

### 7. **Disk Space Issues** 💾

**Problem**: "No space left on device"

**Solution**:

```bash
# On Lightsail instance
df -h
sudo apt-get clean
sudo apt-get autoremove
```

## 🔧 **Testing Your Setup**

### Test SSH Connection Locally:

```bash
ssh -i ~/.ssh/your-private-key ubuntu@your-lightsail-ip
```

### Test Build Locally:

```bash
npm ci
npm run build
```

### Test Nginx Configuration:

```bash
sudo nginx -t
```

## 📋 **Checklist Before Deployment**

- [ ] GitHub secrets configured
- [ ] SSH key pair generated and configured
- [ ] Lightsail instance running
- [ ] Nginx installed and configured
- [ ] Firewall rules set
- [ ] Build works locally
- [ ] Repository has latest changes

## 🆘 **Getting Help**

1. **Check GitHub Actions logs** for specific error messages
2. **Test SSH connection** manually
3. **Verify nginx configuration** on the server
4. **Check server logs**: `sudo journalctl -u nginx`

## 🚀 **Quick Fix Commands**

```bash
# On Lightsail instance - if nginx fails
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx

# If permissions are wrong
sudo chown -R www-data:www-data /var/www/html/goec-dashboard
sudo chmod -R 755 /var/www/html/goec-dashboard

# If SSH key doesn't work
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```
