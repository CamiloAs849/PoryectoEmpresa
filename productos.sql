-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql300.infinityfree.com
-- Tiempo de generación: 02-12-2024 a las 07:21:47
-- Versión del servidor: 10.6.19-MariaDB
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `if0_37829184_productos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calzado`
--

CREATE TABLE `calzado` (
  `ID` int(11) NOT NULL,
  `NombreCalzado` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Talla` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Etiqueta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calzado`
--

INSERT INTO `calzado` (`ID`, `NombreCalzado`, `Precio`, `Talla`, `Tipo`, `Imagen`, `Etiqueta`) VALUES
(18, 'Tenis Lifestyle Negro-Marrón Levi\'s Carson', 172900, '33', 'Americano', 'levis-2219-0859062-1-zoom.webp', 'Agotado'),
(19, 'Tenis Lifestyle Blanco-Gris Royal County of Berksh', 172900, '33', 'Americano', 'royal-county-of-berkshire-polo-club-8222-6232262-1-zoom.webp', 'Nuevo'),
(20, 'Tenis Lifestyle Azul Navy-Amarillo-Blanco adidas S', 177900, '38', 'Nacional', 'adidas-performance-4411-0541162-1-zoom.webp', 'En Promocion'),
(21, 'Tenis de Niño marca Hot wheels / Tenis xia 6-24-2 ', 129000, '27', 'De niño', '245537-1600-1600.webp', 'En Promocion'),
(22, 'Tenis Lifestyle Negro-Blanco-Beige adidas Sportswe', 184000, '33, 35, 30', 'Americano', 'adidas-performance-4235-4459262-1-zoom.webp', 'Nuevo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camisas`
--

CREATE TABLE `camisas` (
  `ID` int(11) NOT NULL,
  `NombreCamiseta` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Talla` varchar(255) NOT NULL,
  `Color` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Etiqueta` varchar(255) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Sexo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camisas`
--

INSERT INTO `camisas` (`ID`, `NombreCamiseta`, `Precio`, `Talla`, `Color`, `Tipo`, `Etiqueta`, `Imagen`, `Sexo`) VALUES
(4, 'Camista Oversize unisex manga corta', 70000, 'XL, M, S', 'Negro', 'Americana', 'Nuevo', 'camiseta-oversize-unicolor-con-manga-corta.webp', 'Hombre'),
(5, 'Camiseta unicolor oversize con manga corta y hombro rodado', 70000, 'XL, M, S', 'Base', 'Americana', 'En Promocion', 'camiseta-unicolor-oversize-con-manga-corta-y-hombro-rodado.jpg', 'Hombre'),
(6, 'Camiseta oversize roja con diseño college y cuello V', 70000, 'XL, M, 2XL, S', 'Rojo', 'Nacional', 'Agotado', 'camiseta-oversize-manga-corta-con-estampacion-college.webp', 'Unisex');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gafas`
--

CREATE TABLE `gafas` (
  `ID` int(11) NOT NULL,
  `NombreGafas` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Etiqueta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gafas`
--

INSERT INTO `gafas` (`ID`, `NombreGafas`, `Precio`, `Imagen`, `Etiqueta`) VALUES
(2, 'Gafas de Sol Dorado Ray-Ban Frank', 400000, 'ray-ban-8064-2781752-1-zoom.webp', 'Nuevo'),
(3, 'Gafas Negras Oakley', 539000, 'oakley-2477-1280501-1-zoom.webp', 'En Promocion'),
(4, 'Gafas de Sol Azul-Plaetado Ray-Ban Erika', 100000, 'ray-ban-8079-4781752-1-zoom.webp', 'Agotado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pantalones`
--

CREATE TABLE `pantalones` (
  `ID` int(11) NOT NULL,
  `NombrePantalon` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Talla` varchar(255) NOT NULL,
  `Color` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Etiqueta` varchar(255) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Sexo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pantalones`
--

INSERT INTO `pantalones` (`ID`, `NombrePantalon`, `Precio`, `Talla`, `Color`, `Tipo`, `Etiqueta`, `Imagen`, `Sexo`) VALUES
(4, 'Formas Intimas Pantalón Sudadera Mujer Verde FI 8618', 31200, '33, 34', 'Verde', 'Nacional', 'Nuevo', 'formas-intimas-2574-9316052-1-catalog-new.webp', 'Mujer'),
(5, 'Jean Cargo', 50000, '33, 32, 22', 'Negro', 'Americano', 'En Promocion', 'outfit-colombia-9990-4621842-3-zoom.webp', 'Hombre'),
(6, 'Atypical Pantalón Atypical 33440', 73500, '33, 32, 22', 'Negro', 'Nacional', 'Agotado', 'atypical-8302-1749442-1-zoom.webp', 'Unisex');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfumes`
--

CREATE TABLE `perfumes` (
  `ID` int(11) NOT NULL,
  `NombrePerfume` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Etiqueta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfumes`
--

INSERT INTO `perfumes` (`ID`, `NombrePerfume`, `Precio`, `Tipo`, `Imagen`, `Etiqueta`) VALUES
(2, 'Perfume Voyage De Nautica Para Hombre 100 Ml', 104900, 'Original', 'nautica-6236-6300761-1-zoom.webp', 'Nuevo'),
(7, 'Perfume Original Bade\'e Al Oud Amethyst 100 ML', 172900, 'Original', 'lattafa-7613-4890462-1-zoom.webp', 'En Promocion'),
(8, 'Perfume 1.0 Delilah Pour Femme EDP 100 ML', 80000, '1.0', 'lattafa-7618-3890462-1-zoom.webp', 'Agotado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relojes`
--

CREATE TABLE `relojes` (
  `ID` int(11) NOT NULL,
  `NombreReloj` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Etiqueta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `relojes`
--

INSERT INTO `relojes` (`ID`, `NombreReloj`, `Precio`, `Imagen`, `Etiqueta`) VALUES
(2, 'Reloj Mulco Mujer Mw-3-17290-021', 979300, 'mulco-6198-3265001-1-zoom.webp', 'Nuevo'),
(3, 'Reloj Casio Mujer GMA-S120GB-1ADR', 563500, 'casio-5565-1657402-1-zoom.webp', 'En Promocion'),
(4, 'Reloj Para Hombre Invicta Pro Diver 30018 Plateado', 289900, 'invicta-9078-5403401-1-zoom.webp', 'Agotado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `Documento` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `Documento`, `Password`) VALUES
(1, '1033179802', '1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calzado`
--
ALTER TABLE `calzado`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `camisas`
--
ALTER TABLE `camisas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `gafas`
--
ALTER TABLE `gafas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `pantalones`
--
ALTER TABLE `pantalones`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `perfumes`
--
ALTER TABLE `perfumes`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `relojes`
--
ALTER TABLE `relojes`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calzado`
--
ALTER TABLE `calzado`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `camisas`
--
ALTER TABLE `camisas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `gafas`
--
ALTER TABLE `gafas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pantalones`
--
ALTER TABLE `pantalones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `perfumes`
--
ALTER TABLE `perfumes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `relojes`
--
ALTER TABLE `relojes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
