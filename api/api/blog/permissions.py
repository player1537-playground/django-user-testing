from rest_framework import permissions

class BlogPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        print('BlogPermission.has_permission', request, view)
        if view.action in ('list', 'retrieve'):
            return True
        elif view.action in ('create', 'update', 'partial_update', 'destroy'):
            return request.user.is_authenticated()
        else:
            return False

    def has_object_permission(self, request, view, obj):
        print('BlogPermission.has_object_permission', request, view, obj)
        if view.action in ('list', 'retrieve'):
            return True
        elif view.action == 'create':
            x = request.user.is_authenticated()
            print('request.user.is_authenticated: {}'.format(x))
            return x
        elif view.action in ('update', 'partial_update', 'destroy'):
            return request.user.is_authenticated() and obj.owner == request.user
        else:
            return False
