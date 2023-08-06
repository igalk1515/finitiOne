#!/bin/bash

# Wait for the database to be ready
# (You might want to replace this with a proper wait script)
sleep 30

# Run migrations
php artisan migrate

# Start Apache in the foreground
apache2-foreground
