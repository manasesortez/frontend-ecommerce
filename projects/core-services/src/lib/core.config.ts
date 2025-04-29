import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalHttpInterceptorFn } from './interceptors/global-http.interceptor';
import { CoreConfigService } from './core-config.service';
import { AdminService, ConversationTagsService } from 'shared-services';
import { AuthAdminService } from './services/auth-admin.service';
import { BannersService } from './services/banners.service';
import { CartService } from './services/cart.service';
import { CategoriesService } from './services/categories.service';
import { ConversationTagsRelationsService } from './services/conversation-tags-relations.service';
import { FavoritesService } from './services/favorites.service';
import { ModulesService } from './services/modules.service';
import { NewsletterService } from './services/newsletter.service';
import { NotificationQueueService } from './services/notification-queue.service';
import { OrdersService } from './services/orders.service';
import { OrderStatusService } from './services/orders-status.service';
import { OrderStatusHistoryService } from './services/orders-status-history.service';
import { PermissionsService } from './services/permissions.service';
import { ProductImageService } from './services/product-images.service';
import { ProductCommentsService } from './services/product-comments.service';
import { ProductHistoryService } from './services/product-history.service';
import { ProductsService } from './services/products.service';
import { RatingsService } from './services/ratings.service';
import { RolesService } from './services/roles.service';
import { ShippingSettingsService } from './services/shipping-settings.service';
import { SlidesService } from './services/slides.service';
import { SocialsService } from './services/socials.service';
import { StoreStatsService } from './services/store-stats.service';
import { StoresService } from './services/store.service';
import { StoreStorageService } from './services/store-storage.service';
import { SubcategoriesService } from './services/subcategories.service';
import { SubscriptionLogsService } from './services/subscription-logs.service';
import { SubscriptionTransactionsService } from './services/subcriptions-transactions.service';
import { SubscriptionPlansService } from './services/subscriptions-plans.service';
import { SubscriptionsPaypalService } from './services/subscritions-paypal.service';
import { SupportService } from './services/support.service';
import { UserStoreService } from './services/user-store.service';
import { TaxSettingsService } from './services/tax-settings.service';
import { TemplatesService } from './services/template.service';
import { UserSubdomainAccessService } from './services/user-subdomain-acess.service';
import { UserService } from './services/users.service';
import { WhatsAppService } from './services/whatsapp.service';

export const coreConfig: ApplicationConfig = {
  providers: [
    CoreConfigService,
    AdminService,
    AuthAdminService,
    BannersService,
    CartService,
    CategoriesService,
    ConversationTagsService,
    ConversationTagsRelationsService,
    FavoritesService,
    ModulesService,
    NewsletterService,
    NotificationQueueService,
    OrdersService,
    OrderStatusService,
    OrderStatusHistoryService,
    PermissionsService,
    ProductImageService,
    ProductCommentsService,
    ProductHistoryService,
    ProductsService,
    RatingsService,
    RolesService,
    ShippingSettingsService,
    SlidesService,
    SocialsService,
    StoreStatsService,
    StoresService,
    StoreStorageService,
    SubcategoriesService,
    SubscriptionLogsService,
    SubscriptionTransactionsService,
    SubscriptionPlansService,
    SubscriptionsPaypalService,
    SupportService,
    UserStoreService,
    TaxSettingsService,
    TemplatesService,
    UserStoreService,
    UserSubdomainAccessService,
    UserService,
    WhatsAppService,
    provideHttpClient(
      withInterceptors([globalHttpInterceptorFn])
    )
  ]
};