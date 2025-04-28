export interface CarMetadata {
    tipo: 'car';
    marca: string;
    modelo: string;
    año: number;
    kilometraje: number;
    transmision: 'automática' | 'manual';
    color: string;
    combustible: 'gasolina' | 'diésel' | 'híbrido' | 'eléctrico';
    [key: string]: any;
  }
  
  export interface RealEstateMetadata {
    tipo: 'real_estate';
    tipoPropiedad: 'apartamento' | 'casa' | 'local' | 'oficina' | 'terreno';
    habitaciones: number;
    baños: number;
    area: number; // m²
    ubicacion: string;
    amenidades: string[];
    [key: string]: any;
  }
  
  export interface FashionMetadata {
    tipo: 'fashion';
    categoria: string;
    material: string;
    colores: string[];
    tallas: string[];
    marca: string;
    genero?: 'hombre' | 'mujer' | 'unisex' | 'niño';
    [key: string]: any;
  }
  
  export interface ElectronicsMetadata {
    tipo: 'electronics';
    categoria: string;
    marca: string;
    modelo: string;
    especificaciones: {
      [key: string]: string | number;
    };
    garantia: number; // meses
    [key: string]: any;
  }
  
  export interface ServicesMetadata {
    tipo: 'services';
    categoria: string;
    duracion: string;
    modalidad: 'presencial' | 'virtual' | 'ambas';
    profesional: {
      nombre: string;
      experiencia: string;
    };
    [key: string]: any;
  }
  
  export interface HealthMetadata {
    tipo: 'health';
    categoria: string;
    marca: string;
    ingredientes: string[];
    volumen: string;
    fechaVencimiento: string;
    [key: string]: any;
  }
  
  export interface FoodMetadata {
    tipo: 'food';
    tipoComida: string;
    alergenos: string[];
    tiempoPreparacion: number; // minutos
    ingredientesDestacados: string;
    dieta: string;
    [key: string]: any;
  }
  
  export interface PetMetadata {
    tipo: 'pet';
    especie: string;
    raza: string;
    edad: number; // meses o años
    vacunas: string[];
    necesidadesEspeciales: string;
    [key: string]: any;
  }
  
  /**
   * Mapeo de subdominios a tipos de metadata
   */
  export type Subdomain = 'cars' | 'real_estate' | 'fashion' | 'electronics' | 'services' | 'health' | 'food' | 'pets';
  
  export type SubdomainToMetadataMap = {
    cars: CarMetadata;
    real_estate: RealEstateMetadata;
    fashion: FashionMetadata;
    electronics: ElectronicsMetadata;
    services: ServicesMetadata;
    health: HealthMetadata;
    food: FoodMetadata;
    pets: PetMetadata;
  };
  
  /**
   * Tipo unión para todos los tipos de metadata
   */